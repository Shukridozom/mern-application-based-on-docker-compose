#!/usr/bin/env sh

# .wait-for-it.sh - Wait for a service to become available on a given host and port

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

if [ -z "$host" ] || [ -z "$port" ]; then
  echo "Usage: wait-for-it.sh <host> <port> [-- <command>]"
  exit 1
fi

echo "Waiting for $host:$port to be available..."

while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "$host:$port is available!"

if [ -n "$cmd" ]; then
  exec $cmd
fi
