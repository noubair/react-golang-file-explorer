package cmds

import (
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/skratchdot/open-golang/open"
)

func Search(messageBody string) []string {

	result := []string{}

	cwd, err := os.Getwd()

	if err != nil {
		log.Panic(err, cwd)
	}

	e := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if err == nil && !info.IsDir() && (strings.Contains(info.Name(), messageBody) || messageBody == "") {
			result = append(result, path)
		}
		return nil
	})

	if e != nil {
		log.Panic(e)
	}

	return result
}

func ListDir(dir string) map[string][]string {

	m := make(map[string][]string)
	m["dirs"] = []string{}
	m["files"] = []string{}

	files, err := ioutil.ReadDir(dir)

	if err != nil {
		log.Panic(err)
	}

	for _, f := range files {
		if f.IsDir() {
			m["dirs"] = append(m["dirs"], f.Name())
		} else {
			m["files"] = append(m["files"], f.Name())
		}

	}
	return m
}

func Launch(filePath string) string {
	open.Run(filePath)

	//TODO: change this
	return ""
}

func Open(messageBody string) string {
	file, err := os.Open(messageBody)
	if err != nil {
		log.Panic(err)
	}
	defer func() {
		if err = file.Close(); err != nil {
			log.Panic(err)
		}
	}()

	b, err := ioutil.ReadAll(file)
	return string(b)
}
