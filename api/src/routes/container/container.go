package containerRoutes

import (
	authHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/auth"
	containerHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/container"
	// otherHandler "github.com/PrashanthSai-K/DeployGenie/api/src/handlers/other"
	"github.com/gofiber/fiber/v2"
)


func SetUpContainerRoutes(router fiber.Router){

	container := router.Group("/container")

	container.Get("/",  containerHandler.GetContainers);

	container.Get("/:id",  containerHandler.GetContainersByUser);

	container.Get("/byname/:name", authHandler.VerifyToken, containerHandler.GetContainerByName);

	container.Post("/", containerHandler.CreateContainer);
	
	container.Post("/approve", authHandler.VerifyAdmin, containerHandler.CreateCont);

	container.Post("/reject", authHandler.VerifyAdmin, containerHandler.RejectCont);

	container.Post("/start", containerHandler.StartCont);

	container.Post("/stop", containerHandler.StopCont);

	container.Post("/terminate", containerHandler.TerminateCont);

	container.Post("/user/start", authHandler.VerifyUser, containerHandler.StartContByUser);

	container.Post("/user/stop",authHandler.VerifyUser, containerHandler.StopContByUser);

	container.Post("/user/terminate", authHandler.VerifyUser, containerHandler.TerminateContByUser);

}