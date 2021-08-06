require_relative 'tsv_buddy'
require_relative 'yaml_buddy'

# This is the main class for FlipFlap Game
class FlipFlap
  # Mixin from module tsv_buddy
  include TsvBuddy
  include YamlBuddy
end
