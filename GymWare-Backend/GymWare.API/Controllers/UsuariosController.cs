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
    public class UsuariosController : ApiController
    {
        private UsuarioLogic _us = new UsuarioLogic();

        //POST: api/Dietas
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult CheckUsuario(UsuarioLoginDTO usuarioLoginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            object usuario = _us.CheckUsuario(usuarioLoginDTO);
            if (usuario != null)
            {
                return Json(usuario);
            }
            else
            {
                return Json("Usuario o Contraseña incorrectos!");
            }
        }
    }
}
