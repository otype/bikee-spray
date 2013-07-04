package service

import akka.actor.{ ExtendedActorSystem, Extension, ExtensionKey }
import scala.concurrent.duration.{ Duration, FiniteDuration, MILLISECONDS }

object SpraySettings extends ExtensionKey[SpraySettings]

/**
 * The settings for Spray backend as an Akka extension:
 *   - `interface`: the network interface the service gets bound to, e.g. `"localhost"`.
 *   - `port`: the port the service gets bound to, e.g. `8080`.
 */
class SpraySettings(system: ExtendedActorSystem) extends Extension {

  /**
   * The network interface the Spray backend service gets bound to, e.g. `"localhost"`.
   */
  val interface: String =
    system.settings.config getString "spray-backend.interface"

  /**
   * The port the Spray backend service gets bound to, e.g. `8080`.
   */
  val port: Int =
    system.settings.config getInt "spray-backend.port"

  val timeout: FiniteDuration =
    Duration(system.settings.config getMilliseconds "spray-backend.timeout", MILLISECONDS)
}
