# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ResoID', models.CharField(max_length=10)),
                ('Name', models.CharField(max_length=20)),
                ('Lat', models.DecimalField(max_digits=10, decimal_places=4)),
                ('Lng', models.DecimalField(max_digits=10, decimal_places=4)),
                ('Skills', models.CharField(max_length=1000)),
            ],
        ),
    ]
