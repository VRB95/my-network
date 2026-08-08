package api

import (
	"strconv"

	"myNetwork/internal/gdb"
	"myNetwork/internal/models"
)

func getHostByID(idStr string) (oneHost models.Host) {

	id, _ := strconv.Atoi(idStr)
	oneHost = gdb.SelectByID(id)

	return oneHost
}
