#!/bin/bash

# start server in daemon mode
docker run --env PORT=7201 -p 7201:7201 -d oyekunle/the_funky_validator:1.0.0
