import { gql } from "@/apollo"

export const CHAT_MESSAGE_FRAGMENT = gql`
  fragment ChatMessageFragment on ChatMessage {
    id
    content
    author {
      id
      name
    }
    createdAt
  }
`

export const CHATS_QUERY = gql`
  query GetChats {
    chats {
      id
      type
      messages {
        ...ChatMessageFragment
      }
    }
  }

  ${CHAT_MESSAGE_FRAGMENT}
`

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($input: SendMessageInput!) {
    createChatMessage(input: $input)
  }
`

export const CHAT_NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription GetNewChatMessages($chatId: String!) {
    createdChatMessage(chatId: $chatId) {
      ...ChatMessageFragment
    }
  }

  ${CHAT_MESSAGE_FRAGMENT}
`

export const CHAT_CLEANUP_SUBSCRIPTION = gql`
  subscription cleanupChat($chatId: String!) {
    cleanupChat(chatId: $chatId)
  }
`
