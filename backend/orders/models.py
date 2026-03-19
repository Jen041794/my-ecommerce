from django.db import models
from members.models import Member
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', '待處理'),
        ('paid', '已付款'),
        ('shipping', '出貨中'),
        ('completed', '已完成'),
        ('cancelled', '已取消'),
    ]
    member = models.ForeignKey(Member, on_delete=models.PROTECT, verbose_name="會員")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending', verbose_name="狀態")
    total = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="總金額")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")

    def __str__(self):
        return f"訂單#{self.id} - {self.member.name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name="商品")
    quantity = models.IntegerField(verbose_name="數量")
    price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="單價")