class Idea < ApplicationRecord
    validates :description, :author, presence: true
end
