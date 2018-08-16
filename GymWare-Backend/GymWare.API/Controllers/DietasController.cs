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
    public class DietasController : ApiController
    {
        private DietaComidaLogic _dc = new DietaComidaLogic();

        // GET: api/Dietas
        public DietaComidaDTO GetAllDietasConComidas()
        {
            return _dc.GetAllDietasConComidas();
        }

        // GET: api/Dietas/5
        [ResponseType(typeof(DietaComida))]
        public IHttpActionResult GetDietaConComidas(int id)
        {
            DietaComida dietaComida = _dc.GetDietaConComidas(id);
            if (dietaComida == null)
            {
                return NotFound();
            }

            return Ok(dietaComida);
        }

        //PUT: api/Dietas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDietaConEjercicios(int id, DietaComidaDTO dietaComidasDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (_dc.Update(id, dietaComidasDTO))
            {
                return Ok("Modificado correctamente");
            }
            else
            {
                return Ok("Error al modificar");
            }
        }

        //POST: api/Dietas
        [ResponseType(typeof(DietaComidaDTO))]
        public IHttpActionResult PostDietaConComidas(DietaComidaDTO dietaComidasDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_dc.Insert(dietaComidasDTO))
            {
                return CreatedAtRoute("DefaultApi", new { }, dietaComidasDTO);
            }
            else
            {
                return NotFound();
            }
        }

        [ResponseType(typeof(DietaCliente))]
        public IHttpActionResult PostDietaCliente(DietaCliente dietaCliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_dc.InsertDietaCliente(dietaCliente))
            {
                return CreatedAtRoute("DefaultApi", new { }, dietaCliente);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/Dietas/5
        [ResponseType(typeof(DietaComida))]
        public IHttpActionResult DeleteDietaConComidas(int id)
        {
            if (_dc.Delete(id))
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
