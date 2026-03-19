from django.db import models

class Member(models.Model):
    name = models.CharField(max_length=100, verbose_name="姓名")
    email = models.EmailField(unique=True, verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, verbose_name="電話")
    address = models.TextField(blank=True, verbose_name="地址")
    is_active = models.BooleanField(default=True, verbose_name="啟用")
    joined_at = models.DateTimeField(auto_now_add=True, verbose_name="加入時間")

    def __str__(self):
        return f"{self.name} ({self.email})"