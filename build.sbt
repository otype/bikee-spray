version := "1.0.0"

scalaVersion := "2.10.2"

name := "angular-spray-seed"

// webapp task
resourceGenerators in Compile <+= (resourceManaged, baseDirectory) map { (managedBase, base) =>
  val webappBase = base / "src" / "main" / "webapp"
  for {
    (from, to) <- webappBase ** "*" x rebase(webappBase, managedBase / "main" / "webapp")
  } yield {
    Sync.copy(from, to)
    to
  }
}

// spray-resolver setting
seq(Revolver.settings: _*)

// watch webapp files
watchSources <+= baseDirectory map { _ / "src" / "main" / "webapp" }

resolvers += "spray repo" at "http://repo.spray.io"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % "2.2.0-RC1",
  "com.typesafe.akka" %% "akka-slf4j" % "2.2.0-RC1",
  "ch.qos.logback" % "logback-classic" % "1.0.13",
  "io.spray" % "spray-can" % "1.2-M8",
  "io.spray" % "spray-routing" % "1.2-M8",
  "io.spray" %% "spray-json" % "1.2.5"
)

scalacOptions ++= Seq(
  "-unchecked",
  "-deprecation",
  "-Xlint",
  "-language:_",
  "-target:jvm-1.6",
  "-encoding", "UTF-8"
)


