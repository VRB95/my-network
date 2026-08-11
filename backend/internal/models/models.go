package models

// Conf - app config
type Conf struct {
	Host     string
	Port     string
	Theme    string
	Color    string
	DirPath  string
	ConfPath string
	DBPath   string
	NodePath string
	LogLevel string
	Ifaces   string
	ArpArgs  string
	ArpStrs  []string
	Timeout  int
	TrimHist int
	ShoutURL string
	Version  string
	// PostgreSQL
	UseDB     string
	PGConnect string
	// InfluxDB
	InfluxEnable  bool
	InfluxAddr    string
	InfluxToken   string
	InfluxOrg     string
	InfluxBucket  string
	InfluxSkipTLS bool
	// Prometheus
	PrometheusEnable bool
}

// Host - one host
type Host struct {
	ID    int    `gorm:"column:ID;primaryKey"`
	Name  string `gorm:"column:NAME"`
	DNS   string `gorm:"column:DNS"`
	Iface string `gorm:"column:IFACE"`
	IP    string `gorm:"column:IP"`
	Mac   string `gorm:"column:MAC"`
	Hw    string `gorm:"column:HW"`
	Date  string `gorm:"column:DATE"`
	Known int    `gorm:"column:KNOWN"`
	Now   int    `gorm:"column:NOW"`
	GroupID int  `gorm:"column:GROUP_ID;index;default:0"`
}

// Group is a reusable, named collection of items and IP addresses.
// The slices are serialized as JSON so the model works with both SQLite and PostgreSQL.
type Group struct {
	ID    int      `gorm:"column:ID;primaryKey" json:"ID"`
	Name  string   `gorm:"column:NAME;uniqueIndex;not null" json:"Name"`
	Items []string `gorm:"column:ITEMS;serializer:json;type:text" json:"Items"`
	IPs   []string `gorm:"column:IPS;serializer:json;type:text" json:"IPs"`
}

// Stat - status
type Stat struct {
	Total   int
	Online  int
	Offline int
	Known   int
	Unknown int
}
