FROM golang:1.14-alpine3.12 AS builder

WORKDIR /app

COPY . .

RUN go mod download
RUN go build -o go-project src/main.go

FROM alpine:3.12 AS runner

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 8080
CMD ["sh" , "-c", "./go-project"];