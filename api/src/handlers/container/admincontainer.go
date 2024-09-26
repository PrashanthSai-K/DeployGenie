package containerHandler

import (
	"context"
	"fmt"
	"time"

	"github.com/PrashanthSai-K/DeployGenie/api/database"
	otherHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/other"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"github.com/gofiber/fiber/v2"
)

func GetContainers(c *fiber.Ctx) error {

	var containers []*model.ContainerView

	db := database.DB

	db.Table("container_views").Find(&containers)

	return c.JSON(fiber.Map{"status": "success", "data": containers})
}

func CreateContainer(c *fiber.Ctx) error {

	db := database.DB

	container := new(model.Containers)

	err := c.BodyParser(container)

	if err != nil {
		fmt.Println(err.Error())
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Bad request"})
	}

	user := new(model.Users)
	result := db.Where("id = ?", container.UserId).First(user)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": "false", "message": "User not found"})
	}

	fmt.Println(container.ImageId, "   ", container.UserId, "    ", container.ExpiryDate, "   ", container.ServiceType, "   ", container.Reason, "    ", container.Outcome)
	container.ContainerId = "-"
	container.ContainerName = fmt.Sprintf("%s_%d_%s", user.UserName, user.Id, time.Now().Format("2006-01-02_15-04-05"))
	container.Status = "pending"

	result = db.Create(container)
	fmt.Println("Presistent: ", container.Presistent)
	if container.Presistent == "Yes" {
		otherHandler.CreateVolume(fmt.Sprintf("%s_%d_%s_%s", user.UserName, user.Id, time.Now().Format("2006-01-02_15-04-05"), "vol"), container.Id, user.Id)
	}

	if result.RowsAffected > 0 {
		return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Request forwarded for approval successfully"})
	}

	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": "false", "message": "Some Internal Error"})
}

func CreateCont(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Post Data Error"})
	}

	db := database.DB

	oldContainer := new(model.Containers)

	dbres := db.Where("id=?", containerData.Id).First(&oldContainer)

	if dbres.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Existing container error"})
	}

	if dbres.RowsAffected <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Container data not found"})
	}

	fmt.Println(containerData)

	var portMap string
	var volumeName string

	if containerData.ImageId == 1 {
		portMap = fmt.Sprintf("%d/tcp", 3306)
		volumeName = fmt.Sprintf("%s_vol:/var/lib/mysql", containerData.ContainerName)
	} else if containerData.ImageId == 2 {
		portMap = fmt.Sprintf("%d/tcp", 27017)
		volumeName = fmt.Sprintf("%s_vol:/var/lib/mongodb", containerData.ContainerName)
	} else {
		portMap = fmt.Sprintf("%d/tcp", 6379)
		volumeName = fmt.Sprintf("%s_vol:/data", containerData.ContainerName)
	}

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		panic(err)
	}

	defer client.Close()

	ctx := context.Background()

	dbPort := fmt.Sprintf("%d", otherHandler.GetPortNumber())
	uiPort := fmt.Sprintf("%d", otherHandler.GetPortNumber())
	sshPort := fmt.Sprintf("%d", otherHandler.GetPortNumber())

	hostDbBinding := nat.PortBinding{
		HostIP:   "0.0.0.0",
		HostPort: dbPort,
	}

	hostWebBinding := nat.PortBinding{
		HostIP:   "0.0.0.0",
		HostPort: uiPort,
	}

	hostSSHBinding := nat.PortBinding{
		HostIP:   "0.0.0.0",
		HostPort: sshPort,
	}

	fmt.Println(containerData)
	imageName := fmt.Sprintf("%s:%s", containerData.ImageName, containerData.ImageTag)
	fmt.Println(imageName)

	containerConfig := &container.Config{
		Image:      imageName,
		Entrypoint: []string{"/bin/bash", "/root/pass.sh"},
		Cmd:        []string{oldContainer.NewUser, oldContainer.NewPassword},
		ExposedPorts: map[nat.Port]struct{}{
			nat.Port(portMap):    {},
			nat.Port("80/tcp"):   {},
			nat.Port("4200/tcp"): {},
		},
	}

	containerBinding := nat.PortMap{
		nat.Port(portMap):    []nat.PortBinding{hostDbBinding},
		nat.Port("80/tcp"):   []nat.PortBinding{hostWebBinding},
		nat.Port("4200/tcp"): []nat.PortBinding{hostSSHBinding},
	}

	var hostConfig *container.HostConfig

	if containerData.Presistent == "Yes" {

		hostConfig = &container.HostConfig{
			PortBindings: containerBinding,
			Resources: container.Resources{
				Memory: int64(512 * 1024 * 1024),
			},
			RestartPolicy: container.RestartPolicy{
				Name: "unless-stopped",
			},
			Binds: []string{
				volumeName,
			},
		}
	} else {
		hostConfig = &container.HostConfig{
			PortBindings: containerBinding,
			Resources: container.Resources{
				Memory: int64(512 * 1024 * 1024),
			},
			RestartPolicy: container.RestartPolicy{
				Name: "unless-stopped",
			},
		}
	}

	containerName := oldContainer.ContainerName

	result, err := client.ContainerCreate(ctx, containerConfig, hostConfig, nil, nil, containerName)

	if err != nil {
		fmt.Println(err.Error())
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"Error": err.Error(), "message": "Error during creation"})
	}

	if err := client.ContainerStart(ctx, result.ID, container.StartOptions{}); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"Error": err.Error(), "message": "Error during creation"})
	}

	resu, err := client.ContainerInspect(ctx, result.ID)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"Error": err.Error(), "message": "Error during creation"})
	}

	fmt.Println(resu.ID, "   ", resu.Name, "     ", resu.State.Status)

	oldContainer.ContainerId = resu.ID
	oldContainer.Status = resu.State.Status

	update := db.Save(&oldContainer)

	if update.RowsAffected == 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": "false", "message": "Error during creation"})
	}

	dbPortNo := new(model.UsedPorts)

	uiPortNo := new(model.UsedPorts)

	sshPortNo := new(model.UsedPorts)

	dbPortNo.ContainerId = oldContainer.Id
	dbPortNo.Port = dbPort
	dbPortNo.UserId = oldContainer.UserId
	dbPortNo.PortUsage = "DB"

	uiPortNo.ContainerId = oldContainer.Id
	uiPortNo.Port = uiPort
	uiPortNo.UserId = oldContainer.UserId
	uiPortNo.PortUsage = "UI"

	sshPortNo.ContainerId = oldContainer.Id
	sshPortNo.Port = sshPort
	sshPortNo.UserId = oldContainer.UserId
	sshPortNo.PortUsage = "WEB SSH"

	insert := db.Create(&dbPortNo)
	fmt.Println("DB : ", insert.RowsAffected)
	if insert.RowsAffected == 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": "false", "message": "Error during creation"})
	}

	insert = db.Create(&uiPortNo)
	fmt.Println("UI : ", insert.RowsAffected)

	if insert.RowsAffected == 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": "false", "message": "Error during creation"})
	}

	insert = db.Create(&sshPortNo)
	fmt.Println("VNC : ", insert.RowsAffected)

	if insert.RowsAffected == 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"success": "false", "message": "Error during creation"})
	}

	fmt.Println("successsssssssssssssss")

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"Success": "true", "message": "Container created successfully", "Container status": resu.State.Status})
}

func StopCont(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	db := database.DB
	oldContainer := new(model.Containers)

	result := db.Where("id=?", containerData.Id).First(&oldContainer)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success": "false", "message": "Container not found"})
	}

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	ctx := context.Background()

	if err = client.ContainerStop(ctx, oldContainer.ContainerId, container.StopOptions{}); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not stopped"})
	}

	resu, err := client.ContainerInspect(ctx, oldContainer.ContainerId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not stopped"})
	}

	oldContainer.Status = resu.State.Status

	update := db.Save(&oldContainer)

	if update.Error != nil || update.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not stopped"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Container stopped successfully"})
}

func StartCont(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	db := database.DB
	oldContainer := new(model.Containers)

	result := db.Where("id=?", containerData.Id).First(&oldContainer)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success": "false", "message": "Container not found"})
	}

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	ctx := context.Background()

	if err = client.ContainerStart(ctx, oldContainer.ContainerId, container.StartOptions{}); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not started"})
	}

	resu, err := client.ContainerInspect(ctx, oldContainer.ContainerId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not started"})
	}

	oldContainer.Status = resu.State.Status

	update := db.Save(&oldContainer)

	if update.Error != nil || update.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not started"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Container started successfully"})
}

func TerminateCont(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	db := database.DB
	oldContainer := new(model.Containers)

	result := db.Where("id=?", containerData.Id).First(&oldContainer)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success": "false", "message": "Container not found"})
	}

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	ctx := context.Background()

	if err = client.ContainerRemove(ctx, oldContainer.ContainerId, container.RemoveOptions{Force: true}); err != nil {
		fmt.Println(err.Error())
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not terminnnnnnnnnnnated"})
	}

	oldContainer.Status = "terminated"

	update := db.Save(&oldContainer)

	if update.Error != nil || update.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Container not Terminated"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Container Terminated successfully"})
}

func RejectCont(c *fiber.Ctx) error {

	containerData := new(model.ContainerView)

	err := c.BodyParser(&containerData)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Received data error"})
	}

	db := database.DB
	oldContainer := new(model.Containers)

	result := db.Where("id=?", containerData.Id).First(&oldContainer)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Received data error"})
	}

	if result.RowsAffected <= 0 {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"success": "false", "message": "Container not found"})
	}

	oldContainer.Status = "rejected"

	update := db.Save(&oldContainer)

	if update.Error != nil || update.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"success": "false", "message": "Request not rejected"})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"success": "true", "message": "Request Rejected successfully"})
}
