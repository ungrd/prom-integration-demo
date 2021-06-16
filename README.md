Test
----------

Start the server:

~~~shell
node .
~~~

Send requests to the server:

~~~shell
curl -X POST -d 'price=1' localhost:6080/price
# Accepted

curl localhost:6080/metrics
# HELP demo_price some token price in type
# TYPE demo_price gauge
demo_price{app="demo"} 1
~~~