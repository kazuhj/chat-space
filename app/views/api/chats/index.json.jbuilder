json.array! @chats do |chat|
  json.content chat.content
  json.image chat.image.url
  json.date chat.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.name chat.user.name
  json.id chat.id
end


# json.content @chat.content
# json.name @chat.user.name
# json.date @chat.created_at.strftime("%Y/%m/%d/ %H:%M")
# json.image @chat.image
# json.id @chat.id