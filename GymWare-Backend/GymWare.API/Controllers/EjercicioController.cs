using GymWare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace GymWare.API.Controllers
{
    public class EjercicioController : ApiController
    {
        private Logic.EjercicioLogic _ej = new Logic.EjercicioLogic();
        // GET: api/Ejercicio
        public List<Ejercicio> GetEjercicios()
        {
            return _ej.GetAll();
        }

        // GET: api/Ejercicio/5
        [ResponseType(typeof(Ejercicio))]
        public IHttpActionResult GetEjercicio(int id)
        {
            Ejercicio ejercicio = _ej.GetOne(id);
            if (ejercicio == null)
            {
                return NotFound();
            }

            return Ok(ejercicio);
        }

        // PUT: api/Ejercicio/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEjercicio(int id, Ejercicio ejercicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ejercicio.EjercicioId)
            {
                return BadRequest();
            }

            if(_ej.Update(id, ejercicio))
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return NotFound();
            }
        }

        // POST: api/Ejercicio
        [ResponseType(typeof(Ejercicio))]
        public IHttpActionResult PostEjercicio(Ejercicio ejercicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }            
            if(_ej.Insert(ejercicio))
            {
                return CreatedAtRoute("DefaultApi", new { id = ejercicio.EjercicioId }, ejercicio);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/Ejercicio/5
        [ResponseType(typeof(Ejercicio))]
        public IHttpActionResult DeleteEjercicio(int id)
        {
            if(_ej.Delete(id))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }
    }
}
