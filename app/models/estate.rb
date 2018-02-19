class Estate < ApplicationRecord

  belongs_to :user

  has_attachments :photos, maximum: 50


end
