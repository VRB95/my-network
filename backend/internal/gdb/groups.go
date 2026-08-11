package gdb

import (
	"myNetwork/internal/check"
	"myNetwork/internal/models"
)

func SelectGroups() (groups []models.Group, ok bool) {
	err := db.Table("groups").Order("\"NAME\" ASC").Find(&groups).Error
	return groups, !check.IfError(err)
}

func SelectGroup(id int) (group models.Group, ok bool) {
	err := db.Table("groups").First(&group, id).Error
	return group, err == nil
}

func SaveGroup(group *models.Group) error {
	return db.Table("groups").Save(group).Error
}

func DeleteGroup(id int) error {
	return db.Table("groups").Delete(&models.Group{}, id).Error
}
