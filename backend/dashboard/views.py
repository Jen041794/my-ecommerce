from django.shortcuts import render

# Create your views here.
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta
from orders.models import Order

def dashboard(request):
    today = timezone.now()
    last_30_days = today - timedelta(days=30)

    # 近 30 天每日銷售額
    daily_sales = (
        Order.objects
        .filter(created_at__gte=last_30_days, status='completed')
        .extra(select={'day': "date(created_at)"})
        .values('day')
        .annotate(total=Sum('total'), count=Count('id'))
        .order_by('day')
    )

    # 統計數字
    stats = {
        'total_revenue': Order.objects.filter(status='completed')
                              .aggregate(Sum('total'))['total__sum'] or 0,
        'total_orders':  Order.objects.count(),
        'pending_orders': Order.objects.filter(status='pending').count(),
    }

    return render(request, 'dashboard/index.html', {
        'stats': daily_sales,
        'summary': stats,
    })