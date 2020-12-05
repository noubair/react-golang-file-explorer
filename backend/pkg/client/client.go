package client

import (
	"explorer/pkg/cmds"
	"sync"
)

type FrontendRequest struct {
	MessageBody   string      `json:"messageBody"`
	Action        string      `json:"action"`
	BackendOutput interface{} `json:"backendOutput"`
}

type Client struct {
	ID string
	mu sync.Mutex
}

func (c *Client) Handle(frontendRequest FrontendRequest) FrontendRequest {
	messageBody := frontendRequest.MessageBody
	if frontendRequest.Action == "search" {
		frontendRequest.BackendOutput = cmds.Search(messageBody)
	} else if frontendRequest.Action == "open" {
		frontendRequest.BackendOutput = cmds.Open(messageBody)
	} else if frontendRequest.Action == "list" {
		frontendRequest.BackendOutput = cmds.ListDir(messageBody)
	} else if frontendRequest.Action == "launch" {
		frontendRequest.BackendOutput = cmds.Launch(messageBody)
	}
	return frontendRequest
}
