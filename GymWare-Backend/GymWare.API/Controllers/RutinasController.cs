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

namespace GymWare.API.Controllers
{
    public class RutinasController : ApiController
    {
        private RutinaEjercicioLogic _re = new RutinaEjercicioLogic();

        // GET: api/Rutinas
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

        // DELETE: api/Rutinas/5
        [ResponseType(typeof(RutinaEjercicio))]
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
