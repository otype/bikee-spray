package service

import akka.actor.{ ActorLogging, ActorRef, Props }
import akka.io.IO
import scala.concurrent.duration.FiniteDuration
import spray.can.Http
import spray.http.MediaTypes._
import spray.httpx.SprayJsonSupport
import spray.routing.{ HttpServiceActor, Route }

object SprayService {

  /**
   * Factory for `akka.actor.Props` for [[service.SprayService]].
   */
  def apply(interface: String, port: Int, timeout: FiniteDuration): Props =
    Props(new SprayService(interface, port, timeout))
}

/**
 * Service is providing
 *   - static resources from the `web` directory
 *   - a REST-ful API under `api/messages/`
 */
class SprayService(interface: String, port: Int, timeout: FiniteDuration) extends HttpServiceActor with ActorLogging {

  import SprayService._
  import SprayJsonSupport._
  import context.dispatcher

  IO(Http)(context.system) ! Http.Bind(self, interface, port)

  override def receive: Receive =
    runRoute(serviceRoute ~ staticRoute)

  def serviceRoute: Route =
    path("service") {
      get {
        respondWithMediaType(`text/html`) {
          complete {
            <html>
              <body>
                <h1><i>Spray stack</i> is up and running...</h1>
              </body>
            </html>
          }
        }
      }
    }

  def staticRoute: Route =
    path("")(getFromResource("web/index.html")) ~ getFromResourceDirectory("web")

}
