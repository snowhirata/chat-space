# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

| Column     | Type        | Options                        |
|:-----------|------------:|:------------------------------:|
| user       | reference   | null: false, foreign_key: true |
| group      | reference   | null: false, foreign_key: true |

### Association
- belongs_to :groups
- belongs_to :users

## usersテーブル

| Column     | Type        | Options                        |
|:-----------|------------:|:------------------------------:|
| name       | string      | null: false                    |
| email      | string      | null: false                    |
| password   | string      | null: false                    |

### Association
- has_many   :groups, through: :members
- has_many   :messages
- has_many   :members

## groupsテーブル

| Column     | Type        | Options                        |
|:-----------|------------:|:------------------------------:|
| name       | string      | null: false                    |

### Association
- has_many   :users, through: :members
- has_many   :messages
- has_many   :members

## messagesテーブル

| Column     | Type        | Options                        |
|:-----------|------------:|:------------------------------:|
| user_id    | integer     | null: false, foreign_key: true |
| group_id   | integer     | null: false, foreign_key: true |
| image      | string      | foreign_key: true              |
| body       | text        | foreign_key: true              |

### Association
- belongs_to :users
- belongs_to :groups
