package database

import (
	"log"
	"os"
)

type FileDatabase struct {
}

func (fd FileDatabase) Write(entry string, file string) {
	f, err := os.OpenFile(file, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()
}
