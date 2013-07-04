package service

import akka.actor.ActorSystem
import scala.util.Properties.{ lineSeparator => newLine }

/**
 * Main class for the Spray service:
 * starts the [[service.SprayService]] actor and can be stopped by hitting the `"ENTER"` key.
 */
object SprayServiceApp extends App {

  val system = ActorSystem("spray-system")
  val interface = SpraySettings(system).interface
  val port = SpraySettings(system).port
  val timeout = SpraySettings(system).timeout
  system.actorOf(SprayService(interface, port, timeout), "spray-system")

  Console.println(s"Running service at localhost:$port")
  Console.println(s"Spray service at localhost:$port/service")
  Console.readLine(s"Hit ENTER to exit ...$newLine")
  system.shutdown()
}
