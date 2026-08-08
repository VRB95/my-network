package check

import (
	"net"
	"strings"

	"myNetwork/internal/models"
)

// DNS - returns DNS names of a host
func DNS(host models.Host) (name, dns string) {

	dnsNames, _ := net.LookupAddr(host.IP)

	if len(dnsNames) > 0 {
		name = dnsNames[0]
		dns = strings.Join(dnsNames, " ")
	}

	return name, dns
}
