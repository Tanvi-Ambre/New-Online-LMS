from django.contrib import admin
from api import models 

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