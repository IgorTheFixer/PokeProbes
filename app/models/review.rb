class Review < ApplicationRecord
    belongs_to :pokemon
    belongs_to :user
    has_many :votes
  
    validates :title, presence: true
    validates :description, presence: true
    validates :rating, presence: true
  end