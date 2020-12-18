#!/bin/sh
cd /setup

sleep 7s

aws sqs create-queue --queue-name notifications --endpoint-url http://localstack:4576
# aws sqs create-queue --queue-name sms_comp_notifications --endpoint-url http://localstack:4576

# Create mts-api table in dynamo
# aws dynamodb create-table --endpoint-url http://localstack:4569 --cli-input-json file://create-sms-header.json
# aws dynamodb create-table --endpoint-url http://localstack:4569 --cli-input-json file://create-sms-retries.json 