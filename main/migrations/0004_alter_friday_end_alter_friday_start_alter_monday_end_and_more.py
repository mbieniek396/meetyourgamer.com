# Generated by Django 4.0.4 on 2022-06-17 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_userprofile_friday_userprofile_friday_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friday',
            name='end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='friday',
            name='start',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='monday',
            name='end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='monday',
            name='start',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='saturday',
            name='end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='saturday',
            name='start',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sunday',
            name='end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sunday',
            name='start',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='thursday',
            name='end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='thursday',
            name='start',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tuesday',
            name='end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tuesday',
            name='start',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='wedensday',
            name='end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='wedensday',
            name='start',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]