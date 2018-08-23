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
    public class MembresiasController : ApiController
    {
        private MembresiaLogic _me = new MembresiaLogic();

        ////POST: api/Membresias/CheckUsuario
        //[ResponseType(typeof(Usuario))]
        //public IHttpActionResult CheckUsuario(UsuarioLoginDTO usuarioLoginDTO)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    Usuario usuario = _us.CheckUsuario(usuarioLoginDTO);
        //    if (usuario != null)
        //    {
        //        return Json(usuario);
        //    }
        //    else
        //    {
        //        return Json("Usuario o Contraseña incorrectos!");
        //    }
        //}

        // POST: api/Membresias/CreateMembresia
        [ResponseType(typeof(Membresia))]
        public IHttpActionResult CreateMembresia(MembresiaCuotaDTO membresiaCuotaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Membresia membresia = _me.CreateMembresia(membresiaCuotaDTO);
            if (membresia != null)
            {
                return Json(membresia);
            }
            else
            {
                return Json("Error al intentar dar de alta la Membresia!");
            }
        }

    }
}
