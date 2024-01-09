# Generated by Django 4.2.5 on 2023-12-07 08:27

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0007_alter_cart_created_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="description",
            name="EN",
            field=models.TextField(blank=True, default="OK", null=True),
        ),
        migrations.AlterField(
            model_name="description",
            name="UA",
            field=models.TextField(blank=True, default="OK", null=True),
        ),
        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.CharField(
                choices=[
                    ("Shirts", "Shirts"),
                    ("Sweatshirts", "Sweatshirts"),
                    ("Hoodies", "Hoodies"),
                    ("Pants", "Pants"),
                    ("Bags", "Bags"),
                ],
                max_length=50,
            ),
        ),
    ]
