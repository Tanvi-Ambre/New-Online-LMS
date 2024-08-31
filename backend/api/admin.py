from django.contrib import admin
from api import models 
from api import views as api_views
from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

admin.site.register(models.Teacher)
admin.site.register(models.Category)
admin.site.register(models.Course)
admin.site.register(models.Variant)
admin.site.register(models.VariantItem)
admin.site.register(models.Question_Answer)
admin.site.register(models.Question_Answer_Message)
admin.site.register(models.Cart)
admin.site.register(models.CartOrder)
admin.site.register(models.CartOrderItem)
admin.site.register(models.Certificate)
admin.site.register(models.CompletedLesson)
admin.site.register(models.EnrolledCourse)
admin.site.register(models.Note)
admin.site.register(models.Review)
admin.site.register(models.Notification)
admin.site.register(models.Coupon)
admin.site.register(models.Wishlist)
admin.site.register(models.Country)
# class AnswerInline(admin.TabularInline):
#     model = models.Answer
#     extra = 1

# class QuestionAdmin(admin.ModelAdmin):
#     list_display = ('text', 'quiz', 'date_created')
#     inlines = [AnswerInline]

# class QuizAdmin(admin.ModelAdmin):
#     list_display = ('title', 'course', 'date_created')
#     search_fields = ('title', 'course__title')
#     list_filter = ('course',)
    
# class UserQuizResponseAdmin(admin.ModelAdmin):
#     list_display = ('user', 'quiz', 'question', 'selected_answer', 'is_correct', 'date_answered')
#     list_filter = ('quiz', 'user', 'is_correct')

# # Register the models with custom ModelAdmin
# admin.site.register(models.Quiz, QuizAdmin)
# admin.site.register(models.Question, QuestionAdmin)
# admin.site.register(models.UserQuizResponse, UserQuizResponseAdmin)

class CustomAdminSite(admin.AdminSite):
    site_header = "LMS Admin Dashboard"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_view(path('dashboard/', self.admin_view(api_views.AdminDashboardView.as_view()), name="admin_dashboard"),), name="admin_dashboard"),
        ]
        return custom_urls + urls

admin_site = CustomAdminSite(name='custom_admin')

# Register your models here
admin_site.register(models.Course)
admin_site.register(models.Teacher)
# etc.