package database

type Database interface {
	Write(messageBody string)
}
