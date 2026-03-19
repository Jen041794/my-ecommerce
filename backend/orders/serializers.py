from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    member_name = serializers.CharField(source='member.name', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'member', 'member_name', 'status',
                  'total', 'items', 'created_at']