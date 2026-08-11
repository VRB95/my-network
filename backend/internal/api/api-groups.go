package api

import (
	"net"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

	"myNetwork/internal/gdb"
	"myNetwork/internal/models"
)

func getGroups(c *gin.Context) {
	groups, ok := gdb.SelectGroups()
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not load groups"})
		return
	}
	if groups == nil {
		groups = []models.Group{}
	}
	c.IndentedJSON(http.StatusOK, groups)
}

func saveGroup(c *gin.Context) {
	var group models.Group
	if err := c.ShouldBindJSON(&group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid group payload"})
		return
	}
	if idParam := c.Param("id"); idParam != "" {
		id, err := strconv.Atoi(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid group id"})
			return
		}
		if _, ok := gdb.SelectGroup(id); !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": "group not found"})
			return
		}
		group.ID = id
	} else {
		group.ID = 0
	}
	group.Name = strings.TrimSpace(group.Name)
	group.Items = cleanValues(group.Items)
	group.IPs = cleanValues(group.IPs)
	if group.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "group name is required"})
		return
	}
	for _, ip := range group.IPs {
		if net.ParseIP(ip) == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid IP address: " + ip})
			return
		}
	}
	if err := gdb.SaveGroup(&group); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "group name must be unique"})
		return
	}
	c.IndentedJSON(http.StatusOK, group)
}

func deleteGroup(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid group id"})
		return
	}
	if _, ok := gdb.SelectGroup(id); !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "group not found"})
		return
	}
	if err := gdb.DeleteGroup(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not delete group"})
		return
	}
	c.Status(http.StatusNoContent)
}

func cleanValues(values []string) []string {
	result := make([]string, 0, len(values))
	seen := make(map[string]bool)
	for _, value := range values {
		value = strings.TrimSpace(value)
		if value != "" && !seen[value] {
			seen[value] = true
			result = append(result, value)
		}
	}
	return result
}
