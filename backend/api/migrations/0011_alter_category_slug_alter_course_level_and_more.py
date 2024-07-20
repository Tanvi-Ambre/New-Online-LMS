# Generated by Django 4.2.7 on 2024-07-19 00:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_course_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(blank=True, default='course', null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='level',
            field=models.CharField(choices=[('Beginner', 'Beginner'), ('Intermediate', 'Intermediate'), ('Advanced', 'Advanced')], default='Beginner', max_length=100),
        ),
        migrations.AlterField(
            model_name='course',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='title',
            field=models.CharField(max_length=255),
        ),
    ]
