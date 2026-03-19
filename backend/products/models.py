from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="分類名稱")

    def __str__(self):
        return self.name

class Product(models.Model):
    STATUS_CHOICES = [
        ('on',  '上架'),
        ('off', '下架'),
    ]

    name     = models.CharField(max_length=200, verbose_name="商品名稱")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,
                                 null=True, verbose_name="分類")
    price    = models.DecimalField(max_digits=10, decimal_places=0,
                                   verbose_name="價格")
    stock    = models.IntegerField(default=0, verbose_name="庫存")
    status   = models.CharField(max_length=3, choices=STATUS_CHOICES,
                                 default='on', verbose_name="狀態")
    # ImageField 先改成 CharField 避免 Pillow 問題
    image    = models.CharField(max_length=200, blank=True,
                                verbose_name="商品圖片")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name