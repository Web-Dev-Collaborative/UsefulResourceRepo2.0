// swift-tools-version:5.2
import PackageDescription

let package = Package(
	name: "Evil",
	platforms: [
		.macOS(.v10_12)
	],
	targets: [
		.target(
			name: "Evil"
		)
	]
)
