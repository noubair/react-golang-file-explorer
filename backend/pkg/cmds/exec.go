package cmds

import (
	"fmt"
	"os/exec"
	"strings"
)

func OsExec(messageBody string) string {
	fields := strings.Fields(messageBody)

	app := fields[0]
	args := fields[1:]

	cmd := exec.Command(app, args...)
	stdout, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return string(err.Error())
	}

	return string(stdout)
}
