# FAQ

## Allow custom MAC vendor overrides 
Original upstream issues: [#169](https://github.com/aceberg/WatchYourLAN/issues/169), [#185](https://github.com/aceberg/WatchYourLAN/issues/185)

myNetwork is using `arp-scan`, so most of its options are available to myNetwork users.

1. Prepare a [mac-vendor.txt](https://manpages.debian.org/testing/arp-scan/mac-vendor.5.en.html) file with additional MACs and put it in a mounted myNetwork directory.
2. If you are using `IFACES` variable to define interfaces, add path to mac-vendor.txt to `ARP_ARGS`
```yaml
arp_args: --macfile=/data/myNetwork/mac-vendor.txt
```
3. For interfaces defined in `ARP_STRS` add the same directly in the beginning of `ARP_STRS` string
```yaml
arp_strs:
    - --macfile=/data/myNetwork/mac-vendor.txt -gNx 10.144.0.1/24 -I eth0
```
4. **WARNING!** To see an updated vendor, you'll have to delete host and wait for the next scan.
