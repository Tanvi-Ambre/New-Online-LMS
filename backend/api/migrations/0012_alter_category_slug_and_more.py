# Generated by Django 4.2.7 on 2024-08-11 05:05

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0011_alter_category_slug_alter_course_level_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
        migrations.AlterUniqueTogether(
            name='enrolledcourse',
            unique_together={('course', 'user')},
        ),
    ]
