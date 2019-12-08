json.content @chat.content
json.name @chat.user.name
json.date @chat.created_at.strftime("%Y/%m/%d/ %H:%M")
json.image @chat.image
json.user_id @chat.user.id