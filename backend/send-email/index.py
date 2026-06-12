import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка сообщения с контактной формы на почту Данилы."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и сообщение обязательны'})
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'danila.aleksandrowitch@yandex.ru'
    to_email = 'danila.aleksandrowitch@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новое сообщение с сайта от {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html_body = f"""
    <html>
    <body style="font-family: 'Arial', sans-serif; background: #f8f6f2; padding: 32px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(15,36,68,0.08);">
        <div style="background: #0f2444; padding: 28px 32px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">Новое сообщение с сайта</h2>
          <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 13px;">sluncenko.ru — официальный сайт</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #7c1d2d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Имя</td>
              <td style="padding: 10px 0; color: #2c2f36; font-size: 15px;">{name}</td>
            </tr>
            {"<tr><td style='padding: 10px 0; color: #7c1d2d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;'>Телефон</td><td style='padding: 10px 0; color: #2c2f36; font-size: 15px;'><a href='tel:" + phone + "' style='color: #0f2444;'>" + phone + "</a></td></tr>" if phone else ""}
            {"<tr><td style='padding: 10px 0; color: #7c1d2d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;'>Email</td><td style='padding: 10px 0; color: #2c2f36; font-size: 15px;'><a href='mailto:" + email + "' style='color: #0f2444;'>" + email + "</a></td></tr>" if email else ""}
          </table>
          <div style="margin-top: 20px; padding: 20px; background: #f8f6f2; border-left: 3px solid #7c1d2d; border-radius: 2px;">
            <p style="color: #4a4f5a; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Сообщение</p>
            <p style="color: #2c2f36; font-size: 15px; line-height: 1.6; margin: 0;">{message}</p>
          </div>
        </div>
        <div style="padding: 20px 32px; background: #f8f6f2; border-top: 1px solid #eee9e0;">
          <p style="color: #aaa; font-size: 12px; margin: 0;">Слюнченко Данила Александрович · Официальный сайт</p>
        </div>
      </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
