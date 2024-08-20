package otherHandler

import (
	"math/rand"
	"github.com/PrashanthSai-K/DeployGenie/api/database"
	"github.com/PrashanthSai-K/DeployGenie/api/src/model"
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
