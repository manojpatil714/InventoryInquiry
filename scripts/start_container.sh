#!/usr/bin/env bash

set -e

docker run -d --name inventoryinquiryapi -p 8000:3004 inventoryinquiryapi
