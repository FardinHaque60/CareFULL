# Generated by Django 5.0.2 on 2024-05-07 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0003_heart_data_steps_data_time_data_weight_data_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='heart_data',
            name='heart_rate',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='steps_data',
            name='steps',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='time_data',
            name='entry_type',
            field=models.CharField(default='NA'),
        ),
        migrations.AddField(
            model_name='time_data',
            name='hours',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='weight_data',
            name='weight',
            field=models.IntegerField(default=0),
        ),
    ]
