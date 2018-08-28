using GymWare.Entities;
using GymWare.Logic;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;

namespace GymWare.API.Controllers
{
    public class RutinasController : ApiController
    {
        private RutinaEjercicioLogic _re = new RutinaEjercicioLogic();

        // GET: api/Rutinas
        [HttpGet]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET")]
        public RutinaEjerciciosDTO GetAllRutinasConEjercicios()
        {
            return _re.GetAllRutinasConEjercicios();
        }

        // GET: api/Rutinas/5
        [ResponseType(typeof(RutinaEjercicio))]
        public IHttpActionResult GetRutinaConEjercicios(int id)
        {
            RutinaEjercicio rutinaEjercicio = _re.GetRutinaConEjercicios(id);
            if (rutinaEjercicio == null)
            {
                return NotFound();
            }

            return Ok(rutinaEjercicio);
        }

        //PUT: api/Rutinas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRutinaConEjercicios(int id, RutinaEjerciciosDTO rutinaEjerciciosDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (_re.Update(id, rutinaEjerciciosDTO))
            {
                return Ok("Modificado correctamente");
            }
            else
            {
                return Ok("Error al modificar");
            }
        }

        //POST: api/Rutinas
        [ResponseType(typeof(RutinaEjercicio))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "POST")]
        public IHttpActionResult PostRutinaConEjercicios(RutinaEjerciciosDTO rutinaEjerciciosDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_re.Insert(rutinaEjerciciosDTO))
            {
                return CreatedAtRoute("DefaultApi", new { }, rutinaEjerciciosDTO);
            }
            else
            {
                return NotFound();
            }
        }

        [ResponseType(typeof(EmpleadoClienteRutina))]
        public IHttpActionResult PostEmpleadoClienteRutina(EmpleadoClienteRutina empleadoClienteRutina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_re.InsertEmpleadoClienteRutina(empleadoClienteRutina))
            {
                return CreatedAtRoute("DefaultApi", new { }, empleadoClienteRutina);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/Rutinas/5
        [ResponseType(typeof(RutinaEjercicio))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "DELETE")]
        public IHttpActionResult DeleteRutinaConEjercicios(int id)
        {
            if (_re.Delete(id))
            {
                return Ok("Eliminado correctamente");
            }
            else
            {
                return Ok("Error al eliminar");
            }

        }
    }
}
