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
        public List<RutinaEjerciciosDTO> GetAllRutinasConEjercicios()
        {
            return _re.GetAllRutinasConEjercicios();
        }

        // GET: api/Rutinas/5
        [ResponseType(typeof(RutinaEjercicio))]
        public IHttpActionResult GetRutinaConEjercicios(int id)
        {
            List<RutinaEjercicio> rutinaEjercicio = _re.GetRutinaConEjercicios(id);
            if (rutinaEjercicio == null)
            {
                return NotFound();
            }

            return Ok(rutinaEjercicio);
        }

        //PUT: api/Rutinas/5
        [ResponseType(typeof(void))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "PUT")]
        public IHttpActionResult PutRutinaConEjercicios(int id, RutinaEjerciciosDTO rutinaEjerciciosDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_re.Update(id, rutinaEjerciciosDTO));
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
            return Ok(_re.Insert(rutinaEjerciciosDTO));
        }

        [ResponseType(typeof(EmpleadoClienteRutina))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "POST")]
        public IHttpActionResult PostEmpleadoClienteRutina(EmpleadoClienteRutina empleadoClienteRutina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_re.InsertEmpleadoClienteRutina(empleadoClienteRutina));
        }

        // DELETE: api/Rutinas/5
        [ResponseType(typeof(RutinaEjercicio))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "DELETE")]
        public IHttpActionResult DeleteRutinaConEjercicios(int id)
        {
            return Ok(_re.Delete(id));
        }
    }
}
