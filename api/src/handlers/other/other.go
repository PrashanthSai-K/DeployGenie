package otherHandler

import (
	"context"
	"math/rand"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
	"github.com/docker/docker/api/types/volume"
	"github.com/docker/docker/client"
)

func GetPortNumber() int {

	db := database.DB

	var usedPorts []model.UsedPorts

	db.Find(&usedPorts)

	var randomPort int;
	minPort := 49152
	maxPort := 65535

	for {
		randomPort = rand.Intn(maxPort-minPort+1) + minPort

		isUsed := false
		for _, portStruct := range usedPorts {
			if portStruct.Port == string(randomPort) {
				isUsed = true
				break
			}
		}

		if !isUsed {
			break
		}
	}
	
	return randomPort;
}

func  CreateVolume ( name string, containerId uint, userId uint ) string {

	client, err := client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		panic(err)
	}

	volume, err := client.VolumeCreate(context.Background(), volume.CreateOptions{Name: name})

	if err != nil {
		panic(err)
	}

	db := database.DB
	volumedb := new(model.Volumes)

	volumedb.VolumeName = volume.Name
	volumedb.ContainerId = containerId
	volumedb.UserId = userId

	result := db.Create(volumedb)

	if result.Error != nil {
		panic(result.Error)
	}
	
	return volume.Name
}
